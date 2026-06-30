import json
s1 = '{"a": "b\nc"}'
try:
    print("strict=False:", json.loads(s1, strict=False))
except Exception as e:
    print("Error with strict=False:", e)

s2 = '{"a": "b", "c": "d",}'
try:
    print("trailing comma:", json.loads(s2, strict=False))
except Exception as e:
    print("Error with trailing comma:", e)
