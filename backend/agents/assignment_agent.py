import ollama

def assign_department(map_text):

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