import os
import anthropic
from IPython.display import Markdown, display
from anthropic import HUMAN_PROMPT, AI_PROMPT

client = anthropic.Anthropic(
    api_key=os.environ["ANTHROPIC_API_KEY"],
)

Prompt = "What is tebentafusp?"

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": Prompt}
    ]
)

out = message.content[0].text
print(out)
