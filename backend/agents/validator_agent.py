from services.llm_gateway import LLMGateway

def validate_map(map_text: str) -> str:
    prompt = f"""
You are a banking compliance auditor.

Review the MAP below.

Return JSON only.

Format:

{{
    "score": 95,
    "result": "PASS",
    "reason": "MAP adequately addresses the obligation."
}}

MAP:

{map_text}
"""
    return LLMGateway.generate(prompt)