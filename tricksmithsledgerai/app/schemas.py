idea_schema = {
    "type": "object",
    "properties": {
        "Title": {"type": "string"},
        "Category": {"type": "string"},
        "Difficulty": {"type": "integer", "minimum": 1, "maximum": 5},
        "DurationMinutes": {"type": "integer"},
        "Setup_Props": {"type": "array", "items": {"type": "string"}},
        "Cast_Roles": {"type": "array", "items": {"type": "string"}},
        "Beats": {
            "type": "object",
            "properties": {
                "Beginning": {"type": "string"},
                "Middle": {"type": "string"},
                "End": {"type": "string"}
            },
            "required": ["Beginning", "Middle", "End"]
        },
        "Risk_Notes": {"type": "string"},
        "Detailed_Scene_Description": {"type": "string"}
    },
    "required": [
        "Title",
        "Category",
        "Difficulty",
        "DurationMinutes",
        "Setup_Props",
        "Cast_Roles",
        "Beats",
        "Detailed_Scene_Description"
    ]
}