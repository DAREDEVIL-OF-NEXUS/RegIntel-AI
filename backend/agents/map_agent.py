from services.llm_gateway import LLMGateway

def generate_map(obligation: str) -> str:
    prompt = f"""
    You are an elite, highly experienced banking compliance officer and regulatory intelligence expert.

    Your task is to analyze the provided obligation and generate a highly specific, compliance-oriented JSON response. Ensure your analysis is strictly and directly tied to the exact language and stated requirements in the obligation. DO NOT hallucinate facts, figures, dates, or currency limits that are not explicitly present in the text. Your output must be deeply analytical and authoritative.

    1. Convert the obligation into a highly specific, operational 'map' (Measurable Action Point) that perfectly aligns with the regulation.
    2. Define a precise, quantifiable 'metric' to measure the success of the MAP.
    3. Specify the exact 'evidence_required' to pass a stringent compliance audit.
    4. Provide an 'ai_summary' (AI Novice Summary) that translates the regulatory jargon into a stylish, highly descriptive, and premium-quality explanation. It should beautifully contextualize the *why* behind the regulation for a non-technical audience while remaining rigorously accurate and free from hallucinated details.
    5. Provide an 'ai_recommendation' (AI Recommendation) detailing EXACT, step-by-step instructions on how the bank must implement this regulation. It should sound highly professional, authoritative, and actionable. Use a numbered list (e.g., "1. Action") for the mandatory steps, followed by a newline, and then use bullet points (e.g., "- Action") for strategic best practices or beneficial actions.

    CRITICAL JSON REQUIREMENT: You MUST escape all line breaks as '\\n' inside the strings. NEVER use literal unescaped line breaks or carriage returns inside the JSON string values, or the JSON parser will crash. Ensure your JSON is 100% syntactically valid.

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