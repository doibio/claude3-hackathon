import os
import anthropic
from IPython.display import Markdown, display
from anthropic import HUMAN_PROMPT, AI_PROMPT

import sys

# Check if the user has provided an argument (the script name is the first argument by default)
if len(sys.argv) < 2:
    print("Usage: python3 script.py filename")
    sys.exit(1)

# The second argument is the filename
filename = sys.argv[1]

# Now, try to open the file and read its content into a variable
try:
    with open(filename, 'r') as file:
        file_content = file.read()
        print(filename)
        print("----------")
        print(file_content)
        print("------------------------------")
except FileNotFoundError:
    print(f"File {filename} not found.")

client = anthropic.Anthropic(
    api_key=os.environ["ANTHROPIC_API_KEY"],
)

Prompt = "We are working with a bacteriophage, MS2.  It can only infect E.coli cells.  Sometimes E.coli can become multidrug resistant in a hospital and the resulting infection can be very hard to treat.  We want to develop a new treatment for E.coli using a virus specific to E.coli, the MS2 phage.  We want to mutate this virus to make it more efficient against E.coli.  Specifically, we want to mutate the L-protein (lysis protein) of the virus to make it more effective against E.coli.  We know that the C-terminal end of the lysis protein requires the DnaJ chaperonin to fold correctly.  We also know that the C-terminal end is not strictly required, and if it is deleted, lysis occcurs more rapidly.  We want to mutate the L-protein so that if the host mutates DnaJ, it cannot escape infection.  There are no PDB structures of the complex.  We asked a student to create mutants of the L-protein.  Please mark the student on their performance as if they were a graduate level student: " + file_content

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": Prompt}
    ]
)

out = message.content[0].text
print(out)

print("==============================")
