from services.llm_gateway import LLMGateway

def parse_regulation(text: str, historical_context: str = "") -> str:
    prompt = f"""
    You are a banking compliance expert.

    Extract:

    1. Obligation
    2. Deadline
    3. Risk Level

    Return JSON only.

    Historical Context (Past related regulations):
    {historical_context}

    Current Regulation:
    {text}
    """
    return LLMGateway.generate(prompt)