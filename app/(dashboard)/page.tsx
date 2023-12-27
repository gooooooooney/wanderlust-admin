import { Description, H3 } from "@/components/typography/text"
import { Separator } from "@/components/ui/separator"

const sentences = [
  "Wishing you a productive and wonderful day!",
  "Hello! Let's make today's efforts count!",
  "Welcome back! Your dedication inspires us all.",
  "Seize the day with a smile and great success will follow.",
  "Good to see you! Let's turn challenges into opportunities today.",
  "Every day brings new possibilities. Make the most of this one!",
  "Stay positive, work hard, and make it happen!",
  "Let's create something amazing today!",
  "Hello! Ready to achieve greatness today?",
  "Welcome! Your energy is our inspiration.",

]

const DashboardPage = () => {
  const index = Math.floor(Math.random() * sentences.length)
  return (
    <div className="flex flex-col gap-y-4">
      <H3 className="mt-4">{sentences[index]}</H3>
      <Description>
        This is your dashboard. You can see your recent activity here.
      </Description>
      <Separator orientation="horizontal" className="my-4" />

    </div>
  )
}

export default DashboardPage