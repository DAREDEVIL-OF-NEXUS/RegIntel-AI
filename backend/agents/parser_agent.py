from services.llm_gateway import LLMGateway

def parse_regulation(text: str, historical_context: str = "") -> str:
    prompt = f"""
    You are a banking compliance expert.

    Extract:

    1. Obligation
    2. Deadline
    3. Risk Level
    4. Priority_Score_1_to_10 (Evaluate urgency, penalty risks, e.g. Cyber breach = 9, minor filing = 2)

    Return JSON only. Do NOT wrap in markdown blocks like ```json.
    
    CRITICAL JSON REQUIREMENT: You MUST escape all line breaks as '\\n' inside the strings. NEVER use literal unescaped line breaks.
    STRICT REQUIREMENT: Do not invent, assume, or add external regulatory figures (like currency limits or dates) that are not explicitly written in the text.

    Historical Context (Past related regulations):
    {historical_context}

    Current Regulation:
    {text}
    """
    return LLMGateway.generate(prompt)