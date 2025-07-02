import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ShieldCheck, Info } from "lucide-react"

const guidelines = [
  {
    id: 1,
    title: "Respect Privacy",
    description: "All conversations are confidential. Do not share personal details without consent.",
    tag: "Important",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Be Supportive",
    description: "Encourage your peers. Mental Saathi is a safe space for everyone.",
    tag: "Community",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "No Judgment",
    description: "Listen without judging. Everyone’s journey is different.",
    tag: "New",
    icon: Info,
  },
]

export function GuidelinesList() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4">
        <AnimatePresence>
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border hover:bg-muted/50 transition-all duration-200 mb-4"
            >
              <div className="flex items-start space-x-3">
                <div className="text-primary mt-1">
                  <guideline.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-base">{guideline.title}</h4>
                    <Badge variant="secondary" className="text-xs">{guideline.tag}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {guideline.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
}
