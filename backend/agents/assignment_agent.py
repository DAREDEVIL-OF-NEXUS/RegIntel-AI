from services.llm_gateway import LLMGateway

def assign_department(map_text: str) -> str:
    prompt = f"""
    You are a banking compliance officer.

    Assign the MAP to exactly one department.

    Available departments:

    - Information Security
    - Compliance
    - Risk Management
    - Operations
    - IT Infrastructure
    - Internal Audit

    Return JSON only.

    Format:

    {{
      "department":""
    }}

    MAP:

    {map_text}
    """
    return LLMGateway.generate(prompt)