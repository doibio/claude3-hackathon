import os
import anthropic
from IPython.display import Markdown, display
from anthropic import HUMAN_PROMPT, AI_PROMPT

client = anthropic.Anthropic(
    api_key=os.environ["ANTHROPIC_API_KEY"],
)

Prompt = "We are working with a bacteriophage, MS2.  It can only infect E.coli cells.  Sometimes E.coli can become multidrug resistant in a hospital and the resulting infection can be very hard to treat.  We want to develop a new treatment for E.coli using a virus specific to E.coli, the MS2 phage.  We want to mutate this virus to make it more efficient against E.coli.  Specifically, we want to mutate the L-protein (lysis protein) of the virus to make it more effective against E.coli.  We know that the C-terminal end of the lysis protein requires the DnaJ chaperonin to fold correctly.  We also know that the C-terminal end is not strictly required, and if it is deleted, lysis occcurs more rapidly.  We want to mutate the L-protein so that if the host mutates DnaJ, it cannot escape infection.  There are no PDB structures of the complex.  How can we best do this using computer driven design, specifically molecular modelling, docking and alphafold2?"

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": Prompt}
    ]
)

out = message.content[0].text
print(out)
