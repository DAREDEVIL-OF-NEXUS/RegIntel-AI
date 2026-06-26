import ollama

def parse_regulation(text):

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