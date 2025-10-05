from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AIMuseService:
    @staticmethod
    def expand_idea(raw_idea: str, category: str) -> dict:
        try:
            prompt = f"Expand this idea in {category} style: {raw_idea}"

            response = client.chat.completions.create(
                model="gpt-4o-mini",  # ✅ modern model name
                messages=[
                    {"role": "system", "content": "You are a creative AI assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=300
            )

            content = response.choices[0].message.content.strip()
            return {"success": True, "result": content}

        except Exception as e:
            return {"success": False, "error": str(e)}