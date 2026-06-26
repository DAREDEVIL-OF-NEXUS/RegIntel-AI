import ollama


def validate_map(map_text):

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

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]