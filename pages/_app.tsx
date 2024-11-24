import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store from "../stores/store";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import SidebarItem from "../components/sidebarItem";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import AddToCollectionModel from "@/components/AddToCollectionModel";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "nex";

export async function generateMetadata() {
  return {
      title: "DiGi Moda - Digital Platform for new generations"
      description: "DiGi Moda - Digital Platform for new generations",
      keywords: [
        "DiGi Moda",
        "Fashion",
        "Beauty",
        "Cultures",
        "Technology"
      ],
      authors: [{ name: "DiGi Moda" }],
      creator: "DiGi Moda",
      canonical: "https://digimoda.xyz",
      languages: "en-us",
      referrer: "origin-when-cross-origin",
      msapplicationTileColor: "#000000",
      manifest: "https://digimoda.xyz/manifest.json",
      openGraph: {
        title: "DiGi Moda",
        description: "DiGi Moda - Digital Fashion Magazine for new generations",
        url: "https://digimoda.xyz/",
        siteName: "DiGi Moda",
        images: [
          {
            url: "/opengraph.png",
            width: 800,
            height: 600
          }
        ],
        locale: "en_US",
        type: "website"
      },
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      twitter: {
        title: "DiGi Moda",
        card: "summary_large_image",
        description: "DiGi Moda - Stay ahead of the game with our latest updates, trend reports, and insider tips. Join our fashion-forward community and let's explore the glamorous side of life!",
        images: "/opengraph.png"
      },
      icons: {
        icon: [
          { url: "/favicon.ico" },
          { url: "/icons/favicon-32x32.png", sizes: "32x32" },
          { url: "/icons/favicon-16x16.png", sizes: "16x16" }
        ],
        other: [
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/icons/apple-touch-icon.png"
          },
          {
            rel: "android-chrome-512x512.png",
            sizes: "512x51",
            url: "/icons/android-chrome-512x512.png"
          },
          {
            rel: "android-chrome-192x192.png",
            sizes: "192x192",
            url: "/icons/android-chrome-192x192.png"
          },
          {
            rel: "mask-icon",
            color: "#5bbad5",
            url: "/icons/safari-pinned-tab.svg"
          }
        ]
      }
    };
  }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link
          rel="preload"
          href="/musive-icons.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/ProximaNova/Proxima Nova Reg.otf"
          as="font"
          crossOrigin=""
          type="font/otf"
        />
        <link
          rel="preload"
          href="/ProximaNova/Proxima Nova Bold.otf"
          as="font"
          crossOrigin=""
          type="font/otf"
        />
      </Head>
      <NextNProgress
        color="#2bb540"
        stopDelayMs={10}
        height={3}
        options={{ showSpinner: false }}
      />

      <Component {...pageProps} />
      <AudioPlayerComponent />
    </Provider>
  );
}

function AudioPlayerComponent() {
  const router = useRouter();
  const isKeyboardOpen = useDetectKeyboardOpen();
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <AddToCollectionModel />
      {router.pathname !== "/login" &&
      router.pathname !== "/register" &&
      router.pathname !== "/_error" &&
      router.pathname !== "/" ? (
        <AudioPlayer className={isKeyboardOpen ? "invisible" : "visible"} />
      ) : (
        <div></div>
      )}
      {router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/_error" &&
        router.pathname !== "/playing" &&
        router.pathname !== "/" && (
          <div
            className={`bg-[#121212] hidden mobile:block tablet:block 
      fixed bottom-0 left-0 right-0 w-full pt-2 pb-1 z-20 ${
        isKeyboardOpen ? "invisible" : "visible"
      }`}
          >
            <div className="flex flex-row justify-center ">
              <SidebarItem name="home" label="Home" />
              <SidebarItem name="search" label="Search" />
              <SidebarItem name="library" label="Library" />
            </div>
          </div>
        )}
    </div>
  );
}
export default MyApp;
