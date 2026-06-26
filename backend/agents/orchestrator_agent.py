from agents.parser_agent import parse_regulation
from agents.map_agent import generate_map
from agents.assignment_agent import assign_department


def run_workflow(regulation_text):

    parsed = parse_regulation(regulation_text)

    try:
        import json
        parsed_json = json.loads(parsed)

        obligation = parsed_json.get("Obligation", regulation_text)

    except:
        obligation = regulation_text

    map_result = generate_map(obligation)

    department = assign_department(map_result)

    return {
        "parsed": parsed,
        "map": map_result,
        "department": department
    }