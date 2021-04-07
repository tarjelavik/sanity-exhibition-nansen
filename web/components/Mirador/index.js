import React, {useEffect} from 'react'
import mirador from 'mirador'
import {Box, useColorModeValue} from '@chakra-ui/react'
import {nanoid} from 'nanoid'
import NavgationButtonsPlugin from './plugins/NavgationButtonsPlugin'
import RemoveNavPlugin from './plugins/RemoveNavPlugin'
import ThumbnailCustomizationPlugin from './plugins/ThumbnailCustomizationPlugin'
import ZoomButtonsPlugin from './plugins/ZoomButtonsPlugin'
import RemoveViewerInfoPlugin from './plugins/RemoveViewerInfoPlugin'

export default function Mirador(props) {
  if (!props) {
    return null
  }
  const {windows, palette, hideWindowTitle = 'false', h = '50vh', workspaceControlPanel = false} = props

  const mode = useColorModeValue('light', 'dark')

  const ID = `mirador-${nanoid()}`

  const arrayToWindows = (data) => {
    if (data.length === 1) {
      const res = [
        {
          manifestId: data[0].manifest,
          ...(data[0].canvasUrl && {canvasId: data[0].canvasUrl}),
          maximized: true,
          allowFullscreen: true,
          allowClose: false,
          allowMaximize: false,
          allowWindowSideBar: true,
          allowTopMenuButton: false,
          hideWindowTitle: hideWindowTitle,
          views: [
            { key: 'single', behaviors: ['individuals'] }
          ]
        },
      ]
      return res
    }
    if (data.length > 1) {
      const windows = data.map((window) => ({
        allowFullscreen: true,
        manifestId: window.manifest,
        views: [
          { key: 'book', behaviors: ['paged'] }
        ]
      }))
      return windows
    }
    return
  }

  useEffect(() => {
    const manifests = arrayToWindows(windows)

    const plugins = [
      RemoveNavPlugin, 
      ThumbnailCustomizationPlugin, 
      NavgationButtonsPlugin,
      ZoomButtonsPlugin,
      /* RemoveViewerInfoPlugin */
    ]

    let config = {
      id: ID,
      createGenerateClassNameOptions: {
        productionPrefix: ID,
      },
      manifests: {
        test: {
          provider: 'Universitetsbiblioteket i Bergen',
        },
      },
      window: {
        defaultView: 'book',
      },
      windows: manifests,
      workspace: {
        showZoomControls: false,
      },
      workspaceControlPanel: {
        enabled: workspaceControlPanel,
      },
      selectedTheme: mode,
      themes: {
        dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#789a5b',
            },
            secondary: {
              main: '#789a5b',
            },
            shades: {
              dark: '#000000',
              main: '#424242',
              light: '#616161',
            },
          },
          overrides: {
            MuiToolbar: {
              root: {
                display: 'none',
              },
            },
            MuiTypography: {
              root: {
                display: 'none',
              },
            },
          },
        },
        light: {
          palette: {
            type: 'light',
            primary: {
              main: '#789a5b',
            },
            secondary: {
              main: '#789a5b',
            }
          },
          overrides: {
            MuiToolbar: {
              root: {
                display: 'none',
              },
            },
            MuiTypography: {
              root: {
                display: 'none',
              },
            },
          },
        },
      },
      thumbnailNavigation: {
        defaultPosition: 'off',
      },
    }

    const miradorInstance = mirador.viewer(config, plugins)

    /*     // We could set this in the config if we want to if we do not want to get it from the state (or to account for multiple windows)
        const windowId = Object.keys(miradorInstance.store.getState().windows)[0];
    
        // Box to zoom to
        const boxToZoom = {
          x: 420,
          y: 831,
          width: 300,
          height: 495
        };
    
        const zoomCenter = {
          x: boxToZoom.x + boxToZoom.width / 2,
          y: boxToZoom.y + boxToZoom.height / 2
        };
    
        var action = mirador.actions.updateViewport(windowId, {
          x: zoomCenter.x,
          y: zoomCenter.y,
          zoom: 1 / boxToZoom.width
        });
        // Don't do this for real, we just want to wait until the canvas is loaded. This is how an element might do this outside of Mirador plugin chain.
        setTimeout(() => {
          miradorInstance.store.dispatch(action);
        }, 1000); */
  }, [])

  return (
    <Box position="relative" h={h}>
      <Box h="100%" id={ID} />
    </Box>
  )
}