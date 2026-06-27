from services.llm_gateway import LLMGateway

def generate_map(obligation: str) -> str:
    prompt = f"""
    You are a banking compliance officer.

    Convert the obligation into a Measurable Action Point (MAP).

    Return JSON only.

    Format:

    {{
      "map": "",
      "metric": "",
      "evidence_required": ""
    }}

    Obligation:

    {obligation}
    """
    return LLMGateway.generate(prompt)