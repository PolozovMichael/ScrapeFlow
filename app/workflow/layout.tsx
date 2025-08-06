import Logo from '@/components/Logo'
import { ModeToggle } from '@/components/ThemeToggle'
import { Separator } from '@/components/ui/separator'

function WorkflowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iz={16} fz="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  )
}

export default WorkflowLayout
