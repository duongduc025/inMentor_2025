import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from typing import Dict
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv()


# In-memory store for chat histories
history_store: Dict[str, ChatMessageHistory] = {}

def get_by_session_id(session_id: str) -> ChatMessageHistory:
    """Retrieve or create a chat message history for a given session_id."""
    if session_id not in history_store:
        history_store[session_id] = ChatMessageHistory()
    return history_store[session_id]

class InterviewService:
    def __init__(self):
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        self.llm = ChatOpenAI(
            model_name="gpt-4o-mini",
            temperature=0,
            openai_api_key=openai_api_key
        )

    def get_response(self, user_prompt: str, session_id: str) -> str:
        system_prompt = f"""
        Bạn đóng vai trò là người phỏng vấn trong một cuộc phỏng vấn ảo. Bắt đầu bằng một phần giới thiệu ngắn về vị trí và công ty (dựa trên JD), sau đó đặt câu hỏi theo kịch bản. Nếu ứng viên trả lời chưa đủ rõ ràng, hãy yêu cầu họ giải thích thêm hoặc đưa ra ví dụ thực tế.
        Cuối cuộc phỏng vấn, đưa ra nhận xét tổng quan dựa trên câu trả lời của ứng viên.
        """

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                MessagesPlaceholder(variable_name="history"),
                ("human", "{input}")
            ]
        )

        runnable = prompt | self.llm

        conversation = RunnableWithMessageHistory(
            runnable,
            get_session_history=get_by_session_id,
            input_messages_key="input",  
            history_messages_key="history"
        )

        response = conversation.invoke(
            {"input": user_prompt},
            config={"configurable": {"session_id": session_id}}
        )
        return response.content