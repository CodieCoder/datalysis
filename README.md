# Datalysis

Datalysis is an AI-assisted data exploration dashboard for turning user-provided JSON or CSV data into useful charts, then asking questions about that data in natural language.

The vision is to make data feel conversational: upload a dataset, let the app recommend the best visualizations, chat with the results, and eventually talk with the data through a voice interface.

## Product Vision

- Generate the most useful charts from raw user data.
- Support JSON and CSV as the primary input formats.
- Let users ask questions about the active dataset without writing queries.
- Move from text chat to voice-driven data conversations.
- Keep the experience lightweight enough for quick exploratory analysis.

## Current Capabilities

- Upload data through a drawer using drag-and-drop or file selection.
- Paste JSON directly into the editor.
- Convert CSV uploads to JSON before storing them.
- Collect a label and description to give the AI backend more context.
- Ask a backend AI service to recommend chart types for the dataset.
- Render selected charts with `@ant-design/plots`.
- Chat with the currently selected dataset through a GPT-style panel.
- Store uploaded datasets in a global React context and track the active dataset.
- Use Mantine components, dark/light theme support, and toast notifications.

## How It Works

1. Add JSON or CSV data from the dashboard.
2. Review the normalized JSON and add a label plus description.
3. Submit the dataset to the backend for chart-type recommendations.
4. Select a recommended chart type to request chart configuration from the backend.
5. Ask questions in the chat panel; prompts are sent with the active dataset and chat history.

## Supported Charts

Datalysis currently maps these chart types to Ant Design Plots components:

- `line`
- `bar`
- `column`
- `pie`
- `doughnut`
- `scatter`

## Tech Stack

- React 18
- TypeScript
- Vite
- Mantine UI and Mantine Dropzone
- Ant Design Plots
- TanStack Query
- Axios
- Sass
- `convert-csv-to-json`
- `simple-tailwind-toast`

## Backend Requirements

The frontend expects an AI backend service that can process datasets, recommend charts, generate chart configuration, and answer questions.

Create `.env.local` and point the app at your backend:

```bash
VITE_SERVER_API=http://127.0.0.1:8000/
```

Required endpoints:

- `POST /chart-types` - accepts dataset metadata and returns recommended chart types.
- `POST /code` - accepts a dataset plus chart type and returns chart configuration/code.
- `POST /gpt` - accepts a dataset plus prompt history and returns a natural-language answer.

Note: `src/utils/runGroq.ts` currently points directly to `http://127.0.0.1:8000/` for the GPT helper path, so keep the local backend there or update that helper when changing backend URLs.

## Local Development

Install dependencies:

```bash
npm install
```

If you prefer Yarn, use `yarn install` and replace the `npm run ...` commands below with `yarn ...`.

Start the Vite dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Map

- `src/main.tsx` - React entrypoint.
- `src/App.tsx` - Mantine provider and global store wrapper.
- `src/mainApp/index.tsx` - App container and toaster setup.
- `src/components/dashboard` - Main dashboard shell and feature panels.
- `src/components/dashboard/components/data` - Upload, JSON editing, and metadata flow.
- `src/components/dashboard/components/chart` - Chart recommendation controls and chart rendering.
- `src/components/dashboard/components/Gpt.tsx` - Text chat UI for the active dataset.
- `src/store/globalStore/Provider.tsx` - Global state reducer, React context, and query client.
- `src/api/chart.ts` - API client for chart recommendation and chart generation routes.
- `src/utils/charts.ts` - Chart type to Ant Design Plot component mapping.
- `src/utils/runGroq.ts` - Backend calls for chart code, chart type inference, and GPT responses.
- `src/utils/constants.ts` - Chart types, limits, prompt constants, and shared enums.

## Current Limits

- Saved datasets are capped at `1500` characters by default.
- JSON is the normalized storage format; CSV is converted before saving.
- Text chat is implemented, but voice conversation is still part of the roadmap.
- The chart generation path calls `/code`, but chart-config parsing and dynamic field selection are still being refined.
- The backend service is not included in this repository.

## Roadmap

- Improve automatic chart field selection from arbitrary datasets.
- Add stronger data validation and friendlier error handling for malformed input.
- Persist datasets and chat sessions beyond the current browser session.
- Add a voice interface for speaking questions and hearing answers.
- Expand chart support beyond the initial Ant Design Plots set.

## License

This repository does not include a license file yet.
