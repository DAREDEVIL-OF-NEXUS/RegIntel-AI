from services.llm_gateway import LLMGateway

def parse_regulation(text: str) -> str:
    prompt = f"""
    You are a banking compliance expert.

    Extract:

    1. Obligation
    2. Deadline
    3. Risk Level

    Return JSON only.

    Regulation:

    {text}
    """
    return LLMGateway.generate(prompt)