# FinChip Skill review rubric

Rate the downloaded Skill, not FinChip CLI, the Site, RPC providers, the chain,
or the acquisition and download experience. If the cause of a failure is
unclear, do not publish a rating yet.

Only score after meaningful use. Base the review body on observed behavior and
name the tested Agent/model environment when relevant.

## Operational Independence

Evaluate whether the Skill completes its claimed workflow after its required
inputs, permissions, and dependencies are available.

- `1`: Cannot complete the workflow or requires continual manual takeover.
- `3`: Completes the main workflow with some correction or intervention.
- `5`: Reliably completes the workflow and handles expected failures well.

## Output Quality

Evaluate correctness, completeness, relevance, consistency, and usability of
the Skill's actual result.

- `1`: Materially wrong, incomplete, or unusable.
- `3`: Generally usable but needs meaningful correction or refinement.
- `5`: Consistently correct, complete, and ready for its claimed purpose.

## Model Compatibility

Evaluate behavior in the Agent/model environments the Skill claims to support.
Do not claim compatibility with an environment that was not tested.

- `1`: Fails in a claimed environment or relies on undisclosed model behavior.
- `3`: Works with notable prompt, tool, or environment adjustments.
- `5`: Works as documented in the tested claimed environments.

Use `2` and `4` for evidence between the anchors.

## FinChip submission rules

- Public listing does not require login.
- Submission requires login and a current license at submission time.
- A creator cannot review their own Skill.
- The three required scores are averaged by the Site.
- Show the user the three scores and public review body before submission.
- A submitted review remains after transferring the license.
- The author may delete their own review after transferring the license.
