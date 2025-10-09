import os, json
from dotenv import load_dotenv
from openai import OpenAI
from schemas import idea_schema

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AIMuseService:
    def __init__(self):
        self.model_name = "gpt-4o-mini" 

    def expand_idea(self, raw_idea: str, category: str) -> dict:
        """
        Uses structured prompting so the AI returns a valid JSON object.
        """

       
        system_prompt = (
            "You are the Tricksmith's Ledger 'AI Muse', a theatrical circus inventor.\n"
            "Your job: transform rough one-line ideas into full, structured performance routines.\n"
            "Tone: creative, vivid, formal—but grounded and safe for rehearsal.\n"
            "ALWAYS reply ONLY with valid JSON following the schema I’ll provide."
        )


        user_prompt = f"""
Raw Idea: {raw_idea}
Category: {category}

Please expand this idea into a complete routine using the JSON schema below.
Include Title, Category, Difficulty (1–5), DurationMinutes, Setup_Props,
Cast_Roles, Beats (Beginning, Middle, End), Risk_Notes, and a Markdown-formatted Detailed_Scene_Description.

Return ONLY valid JSON, nothing else.

JSON schema:
{json.dumps(idea_schema, indent=2)}
"""

      
        completion = client.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},   
            temperature=0.9,
            max_tokens=900,
        )

        raw_response = completion.choices[0].message.content

        try:
            parsed = json.loads(raw_response)
        except json.JSONDecodeError:
            parsed = {"error": True, "message": "Model returned invalid JSON", "raw_output": raw_response}

        return parsed