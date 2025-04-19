import React, { useState, useRef } from "react";

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void;
}

const VoiceRecorder = ({ onTranscript }: VoiceRecorderProps) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = handleStop;

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    
    setRecording(false);
  };

  const handleStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

    // Chuẩn bị gửi tới Whisper API
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");
    formData.append("model", "whisper-1");
    formData.append("language", "vi");
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (onTranscript) {
      onTranscript(data.text); 
    }
    setTranscript(data.text);
  };

  const handleMicClick = () => {
    recording ? stopRecording() : startRecording();
  };

return (
  <div className="p-2 text-center">
    <button
      onClick={handleMicClick}
      className={`
        p-3 rounded-full 
        text-white 
        transition duration-300 
        shadow-md 
        drop-shadow 
        hover:scale-105
        ${
          recording
            ? "bg-red-600 ring-2 ring-red-300 scale-105"
            : "bg-blue-600 hover:bg-blue-700"
        }
      `}
    >
      🎤
    </button>
    <p className="mt-1 text-xs text-gray-500">
      {recording}
    </p>
  </div>
);



};

export default VoiceRecorder;
