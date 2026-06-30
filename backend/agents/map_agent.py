from services.llm_gateway import LLMGateway

def generate_map(obligation: str) -> str:
    prompt = f"""
    You are a banking compliance officer.

    Convert the obligation into a Measurable Action Point (MAP).
    Additionally, provide an 'ai_summary' explaining this regulation in highly descriptive, novice language so a layman can understand it.
    Also, provide an 'ai_recommendation' that includes the EXACT step-by-step instructions on implementing this regulation, along with any additional beneficial actions to undertake alongside it.
    IMPORTANT: For the 'ai_recommendation', use numbered lists (e.g. "1. Do this") for the step-by-step instructions, and bullet points (e.g. "- Also do this") for the additional recommendations. Separate the two sections with a newline.

    CRITICAL JSON REQUIREMENT: You MUST escape all line breaks as '\\n' inside the strings. NEVER use literal unescaped line breaks or carriage returns inside the JSON string values, or the JSON parser will crash. Ensure your JSON is 100% syntactically valid.

    STRICT REQUIREMENT: Do not invent, assume, or add external regulatory figures (like currency limits or dates) that are not explicitly written in the text.

    Return JSON only. Do NOT wrap in markdown blocks like ```json.

    Format:

    {{
      "map": "",
      "metric": "",
      "evidence_required": "",
      "ai_summary": "",
      "ai_recommendation": ""
    }}

    Obligation:

    {obligation}
    """
    return LLMGateway.generate(prompt)