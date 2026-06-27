from services.llm_gateway import LLMGateway

def parse_regulation(text: str, historical_context: str = "") -> str:
    prompt = f"""
    You are a banking compliance expert.

    Extract:

    1. Obligation
    2. Deadline
    3. Risk Level
    4. Priority_Score_1_to_10 (Evaluate urgency, penalty risks, e.g. Cyber breach = 9, minor filing = 2)

    Return JSON only.

    Historical Context (Past related regulations):
    {historical_context}

    Current Regulation:
    {text}
    """
    return LLMGateway.generate(prompt)