from services.llm_gateway import LLMGateway

def generate_map(obligation: str) -> str:
    prompt = f"""
    You are a banking compliance officer.

    Convert the obligation into a Measurable Action Point (MAP).
    Additionally, provide an 'ai_summary' explaining this regulation in highly descriptive, novice language so a layman can understand it.
    Also, provide an 'ai_recommendation' that includes the EXACT step-by-step instructions on implementing this regulation, along with any additional beneficial actions to undertake alongside it.

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