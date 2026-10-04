import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import SelectScreen from './screens/SelectScreen'
import ResultScreen from './screens/ResultScreen'
import { runDiagnose, type Diagnosis, type Selection } from './lib/diagnose'

type Screen = 'select' | 'result'

const variants = {
  enter: (dir: number) => ({ x: dir * 44, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 44, opacity: 0 }),
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('select')
  const [selection, setSelection] = useState<Selection>({})
  const [description, setDescription] = useState('')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)

  const submit = () => {
    setDiagnosis(runDiagnose(description, selection))
    setScreen('result')
  }

  const dir = screen === 'result' ? 1 : -1

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-full items-center justify-center md:py-[3vh]">
        <div className="relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-white md:h-[94dvh] md:max-h-[900px] md:rounded-[40px] md:shadow-[0_24px_70px_-20px_rgba(31,68,77,0.35)] md:ring-1 md:ring-black/5">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={screen}
              className="absolute inset-0"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            >
              {screen === 'select' ? (
                <SelectScreen
                  selection={selection}
                  onSelectionChange={setSelection}
                  description={description}
                  onDescriptionChange={setDescription}
                  onSubmit={submit}
                />
              ) : diagnosis ? (
                <ResultScreen diagnosis={diagnosis} onBack={() => setScreen('select')} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}
