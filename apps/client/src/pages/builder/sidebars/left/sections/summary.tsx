import { defaultSections } from "@reactive-resume/schema";
import { RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";
import { useSectionProgress } from "@/client/hooks/use-section-progress";

import { SectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );

  // Check if summary is complete (has content)
  const isCompleted = Boolean(section.content && section.content.trim().length > 0);

  // Use the progress hook
  useSectionProgress("summary", isCompleted);

  return (
    <section id="summary" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="summary" size={18} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{section.name}</h2>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id="summary" />
        </div>
      </header>

      <main className={cn(!section.visible && "opacity-50")}>
        <RichInput
          content={section.content}
          footer={(editor) => (
            <AiActions
              value={editor.getText()}
              onChange={(value) => {
                editor.commands.setContent(value, true);
                setValue("sections.summary.content", value);
              }}
            />
          )}
          onChange={(value) => {
            setValue("sections.summary.content", value);
          }}
        />
      </main>
    </section>
  );
};
