# Project data

Each file in this folder is one project. The portfolio reads them automatically —
adding a JSON file is enough to create a project card, and (unless it is marked as
coming soon) a case study page.

```
data/projects/<slug>.json
```

The `slug` field should match the file name. Routes are generated from `category`:

| `category`  | Listing page      | Case study page                  |
| ----------- | ----------------- | -------------------------------- |
| `brand`     | `/brand-design`   | `/brand-design/<slug>`           |
| `product`   | `/product-design` | `/product-design/<slug>`         |
| `engineering` | `/product-design` | `/product-design/<slug>`       |

## Adding a project

1. Create `data/projects/my-project.json`.
2. Copy the structure from an existing project and fill in only what is accurate.
3. Add the cover image and gallery images under `public/images/projects/my-project/`.
4. Run `npm run build`.

Projects with no `period` (or `subtitle: "Project Coming Soon"`) appear as
"coming soon" cards and do not get a case study page.

## Fields

Required for a case study:

| Field         | Type       | Notes                                              |
| ------------- | ---------- | -------------------------------------------------- |
| `slug`        | `string`   | URL segment. Use lowercase words separated by `-`. |
| `category`    | `string`   | `brand`, `product` or `engineering`.               |
| `title`       | `string`   | Project name.                                      |
| `subtitle`    | `string`   | Short project type, e.g. "Brand Identity".         |
| `role`        | `string`   | Your actual role.                                  |
| `company`     | `string`   | Client or employer.                                |
| `period`      | `string`   | Year or date range.                                |
| `coverImage`  | `string`   | Path under `/public`.                              |
| `overview`    | `string`   | One-paragraph summary.                             |
| `problem`     | `string`   | Brief / challenge.                                 |
| `solution`    | `string`   | Approach.                                          |

Optional content:

| Field             | Type       | Notes                                                        |
| ----------------- | ---------- | ------------------------------------------------------------ |
| `personal`        | `boolean`  | Marks personal (not client) work.                            |
| `companyUrl`      | `string`   | Client website.                                              |
| `targetAudience`  | `string[]` | Intended users or audience.                                  |
| `regions`         | `string[]` | Markets / regions.                                           |
| `timeline`        | `string`   | Duration or delivery window.                                 |
| `features`        | `object[]` | `{ title, description }` deliverables or capabilities.       |
| `techStack`       | `object[]` | `{ name, category }`. Used as disciplines on cards.          |
| `results`         | `object[]` | `{ metric, value, description }`. Only include if verified.  |
| `testimonial`     | `object`   | `{ quote, author, role, company? }`.                         |
| `links`           | `object[]` | `{ label, url, type }`. External links.                      |
| `images`          | `object[]` | `{ src, alt, caption? }`. Gallery images. Alt text required. |
| `sections`        | `object[]` | `{ title, content }`. Extra long-form chapters.              |
| `layout`          | `string`   | `"gallery"` for image-led brand projects.                    |
| `industry`        | `string`   | Sector, when known. Omit rather than guess.                  |
| `disciplines`     | `string[]` | Overrides `techStack` names on cards.                        |
| `projectType`     | `string`   | `Client project`, `Personal project`, `Concept`, `Prototype`. |
| `status`          | `string`   | Short status label.                                          |

`sections[].content` supports simple Markdown: paragraphs, `-` lists, `**bold**`,
and pipe tables. `results` are only rendered as "Outcomes" when present, so never
add invented metrics, awards or client outcomes.
