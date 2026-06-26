import ollama

def generate_map(obligation):

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