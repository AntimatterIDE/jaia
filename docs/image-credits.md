# Image and brand asset credits

## Client-supplied brand assets

| File                                    | Use                      | Source                                |
| --------------------------------------- | ------------------------ | ------------------------------------- |
| `public/brand/jaia-logo-horizontal.png` | Site header, mobile menu | Supplied by JAIA                      |
| `public/brand/jaia-logo-stacked.svg`    | Footer                   | Supplied by JAIA                      |
| `public/brand/clinix-ai-logo.png`       | APCM + BHI partner section, `/partners` | Supplied Clinix AI lockup (used on ink; name also set in type because “Clinix” is black in the file) |
| `public/brand/pareja-medical-consultants.png` | `/partners` (hero logo row, spotlight, Q&A) | Pareja Medical Consultants wordmark, supplied by JAIA |
| `app/icon.svg`                          | Favicon (SVG)            | Derived from the JAIA symbol geometry |
| `app/favicon.ico`                       | Favicon (16/32/48)       | Same mark; 16px crops to the central diamonds + chevrons |
| `app/icon.png` / `app/icon1.png`        | Favicon 32 / 48          | Same mark, transparent background     |
| `app/apple-icon.png`                    | Apple touch icon 180     | Same mark on white                    |

The JAIA symbol used for decorative watermarks and the favicon is extracted
from the supplied stacked logo (`components/jaia-symbol.tsx`).

## Video — client-supplied stock

| File                           | Used by         | Subject                                                                                                                                                                                          |
| ------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `videos/hospital-corridor.mp4` | About page hero | Medical team posing in a hospital corridor. Copied from the user-supplied file `medical-team-posing-in-hospital-corridor-2026-01-22-05-25-31-utc.mp4`. Stock clip, not JAIA staff or facilities. |

## Photography — case studies

| File                         | Used by                                      | Subject                                                                                         | Source                                                                 |
| ---------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `case-novo-wellness.jpg`     | Homepage strip, `/case-studies/novo-wellness` | Tan two-story medical office with a NOVO Wellness lawn sign, Aiken, SC                          | Client-supplied still for the NOVO Wellness Center engagement          |
| `case-mukesh-gandhi.jpg`     | Homepage strip, `/case-studies/mukesh-gandhi` | Red-brick medical office with a columned entrance at 409, Woodruff, SC                          | Client-supplied still for the Dr. Mukesh Gandhi engagement             |
| `case-laboratory.jpg`        | Homepage strip, `/case-studies/laboratory-coordination` | Technician in blue gloves pipetting amber liquid into a tube (yellow/orange caps; no blood) | Stock still supplied for the laboratory study; not a named JAIA client |
| `iv-therapy-suite.jpg`       | Homepage strip, `/case-studies/iv-therapy`                  | In-practice infusion suite                                                                      | Existing AI-generated service photograph; IV study has no named practice yet |

Do not attach invented client names to the laboratory or IV photographs.

## Photography — homepage capability stack (client-supplied stock)

The client asked for a more futuristic homepage stack, a deliberate departure
from the original brief's "no futuristic AI visuals" direction. These six
stills were exported at 2048px wide from the supplied originals. They are
stock imagery, not JAIA staff, clients, or facilities. Each one also fills the
matching include card on its service page; the other include cards keep the
stills listed below.

| File                                | Used by                                                        | Subject                                                                                 | Source file                                                                      |
| ----------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `stack-body-scan-interface.jpg`     | Homepage stack; APCM + BHI — Chronic care coordination         | Clinician holding a stethoscope to a holographic whole-body interface                   | `medical-professional-using-digital-interface-techn-2026-09-22-09-34-43-utc.jpg` |
| `stack-hrv-heartbeat-line.jpg`      | Homepage stack; HRV — Objective assessment                     | Single glowing ECG trace on deep blue                                                   | `HRV.jpg`                                                                        |
| `stack-vessel-visualization.jpg`    | Homepage stack; IV Therapy — Protocol design                   | Clinician touching glowing blue vessel strands                                          | `healthcare-worker-examining-medical-data-visualiza-2026-09-24-21-09-42-utc.jpg` |
| `stack-heart-scan-dashboard.jpg`    | Homepage stack; Billing & RCM — Coding and claims              | Holographic heart scan and data panels in a waiting area                                | `futuristic-heart-scan-technology-in-a-hospital-set-2026-09-22-09-23-59-utc.jpg` |
| `stack-high-tech-lab.jpg`           | Homepage stack; Laboratory Coordination — Reference-lab access | Lab staff in protective suits at monitors; a small rack of red-capped tubes on the desk | `scientists-in-protective-suits-working-in-a-high-t-2026-09-25-07-31-43-utc.jpg` |
| `stack-diagnostics-touchscreen.jpg` | Homepage stack; POL Establishment — Equipment and validation   | Finger on a translucent diagnostics panel beside a DNA strand                           | `medical-professional-using-futuristic-touchscreen-2026-09-22-09-28-48-utc.jpg`  |

## Photography — generated placeholders

The remaining service-page photography is **AI-generated placeholder imagery**,
created to match the brand's cool, calm, editorial direction. It replaced the
earlier stock photography, which was off-brand: one shot was an empty lab that
did not match its own alt text, and another showed red-capped blood tubes that
conflict with the specification's guidance to avoid clinical blood imagery.

Scene stills used on service pages are JPEG at
1536px on the long edge (or 1024×1536 for the portrait blue-tube and unused
hero clinician cards).

| File                              | Used by                                              | Subject                                                                     |
| --------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `about-team-collaboration.jpg`    | Homepage About story                                 | Three-person practice team reviewing charts                                 |
| `care-management-coordinator.jpg` | Unused (former service photo)                        | Care coordinator on a patient call                                          |
| `hrv-assessment-clinic.jpg`       | Unused (former service photo)                        | Clinician reviewing a waveform on a monitor                                 |
| `iv-therapy-suite.jpg`            | IV Therapy case study (see above)                    | In-practice infusion suite                                                  |
| `billing-rcm-workspace.jpg`       | `/partners` hero (former service photo)              | Practice back-office claims workspace                                       |
| `lab-reference-coordination.jpg`  | Unused (former service photo)                        | Specimen rack beside an analyzer (clear liquid, blue screw caps)            |
| `lab-office-bench.jpg`            | Unused (former service photo)                        | Physician office laboratory bench                                           |
| `lab-blue-tubes.jpg`              | Unused (former homepage stack)                       | Blue graduated cylinders (no blood); AI recapture of earlier attached still |
| `lab-modern-interior.jpg`         | Unused (former homepage stack)                       | Modern clinical lab interior; AI recapture of earlier Pexels reference      |

Testimonial avatars are initials. The stock/AI `placeholder-portrait-*.jpg`
headshots were removed at the client's request; add a photo only if it is a
consented photograph of the person quoted.

## Photography — service include stack stills

Dedicated AI-generated clinical/ops stills for the “What it includes”
ScrollStack on each service page. Models and rooms are placeholders, not
JAIA clients or facilities. No blood or red-capped vacutainer photography.

| File                                   | Used by                                            | Subject                                                                    |
| -------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| `include-program-infrastructure.jpg`   | APCM + BHI — Program infrastructure                | Enrollment workflow tablet and protocol binder on a practice desk          |
| `include-behavioral-health.jpg`        | APCM + BHI — Behavioral health access              | Empty calm consult alcove                                                  |
| `include-care-plan-insights.jpg`       | HRV — Care-plan insights                           | Clinician reviewing a care plan and tablet                                 |
| `include-longitudinal-tracking.jpg`    | HRV — Longitudinal tracking                        | Monitor showing unlabeled trend charts                                     |
| `include-supply-chain.jpg`             | IV Therapy — Supply chain                          | Organized IV fluid and supply cabinet                                      |
| `include-staff-training-iv.jpg`        | IV Therapy — Staff training                        | Educator and staff in an infusion suite                                    |
| `include-denial-management.jpg`        | Billing & RCM — Denial management                  | Claims denial queue on a back-office monitor                               |
| `include-ar-recovery.jpg`              | Billing & RCM — A/R recovery                       | Aging-report workspace with headset                                        |
| `include-partnership-coordination.jpg` | Laboratory Coordination — Partnership coordination | Two ops professionals reviewing a lab partnership folder                   |
| `include-test-routing.jpg`             | Laboratory Coordination — Test routing             | Send-out station: labels, scanner, blue-capped clear tubes, shipping totes |
| `include-clia-considerations.jpg`      | POL Establishment — CLIA considerations            | Regulatory binders on a POL desk                                           |
| `include-staff-training-pol.jpg`       | POL Establishment — Staff training                 | Trainer demonstrating a benchtop analyzer                                  |

`lab-blue-tubes.jpg` and `lab-modern-interior.jpg` previously lived in this
repo as attached/Pexels stock at ~1024px. They were replaced with AI
recaptures of those scenes (1536px on the long edge) so the homepage stack
stays sharp at desktop size. Both are now unused: the homepage stack moved to
the client-supplied stills above.
The original Pexels frame was [Pexels / Pavel Danilyuk](https://www.pexels.com/photo/8442105/).
Blood-sample / vacutainer stills from the same attachment set were **not**
added.

All six services now carry a photograph. The symbol-and-icon fallback panel is
still implemented on the service page and in the capability stack, so a record
with no `image` renders correctly if one is removed.

`hero-practice-clinician.jpg` is currently unused: the homepage hero was
rebuilt as an editorial spread over an animated JAIA-mark backdrop
(`components/marketing/hero-backdrop.tsx`) and no longer carries a photograph.
The file is retained in case the hero returns to a photographic treatment.

### Before production launch

These images depict **models and generated scenes, not JAIA staff, clients, or
facilities.** Replace them with approved JAIA photography before launch, or
confirm with counsel that generated placeholder imagery is acceptable for a
healthcare services site in your jurisdiction.

Every image is referenced from the typed content model
(`content/services.ts` or `content/testimonials.ts`) or from the include-image
map in `components/marketing/service-capabilities.tsx` (homepage stack:
`components/marketing/capability-scroll-stack.tsx`), so swapping a file
means changing one `src` (and `alt`, `width`, and `height` where those live
on the record).

## Still needed from the client

- Approved team member names, roles, bios, and headshots (the About page team
  section renders nothing until these exist)
- Real contact details, office address, and phone number
- Any compliance or certification claims that should appear in the footer
- Delivery credentials for the contact form (see `app/contact/actions.ts`)
