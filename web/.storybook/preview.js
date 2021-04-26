import {
  ChakraProvider,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import * as React from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import theme from '../theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
}

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const nextMode = useColorModeValue("dark", "light")

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}


const withChakra = (StoryFn, context) => {
  const { direction } = context.globals
  const dir = direction.toLowerCase()
  const newTheme = {
    ...theme,
    config: {
      direction: dir,
      initialColorMode: "dark",
      useSystemColorMode: false,
    }
  }

  return (
    <ChakraProvider theme={newTheme}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <ColorModeToggleBar />
        <StoryFn />
      </div>
    </ChakraProvider>
  )
}

export const decorators = [withChakra]