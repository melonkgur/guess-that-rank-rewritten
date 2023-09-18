import styles from '@/styles/Play.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar/Navbar'
import Image from 'next/image'
import { motion } from 'framer-motion'
import RightArrow from '@/components/icons/RightArrow'
import PostGuessPopup from '@/components/post-guess-popup/PostGuessPopup'
import { gameRanks } from '@/utils/constants'


const Play = () => {

    const router = useRouter()

    const [game, setGame] = useState<string>()

    const [hoveringLockInt, setHoveringLockInt] = useState<boolean>()
    const [currentSelectedRank, setCurrentSelectedRank] = useState<number>()
    const [showPostGuessPopup, setShowPostGuessPopup] = useState<boolean>(false)

    useEffect(() => {
        if (router.isReady) {
            setGame(router.query.game as string)
        }
    }, [router.isReady])

    const getRankItemDimensions = (length: number) => {
        return `calc((60vw - ${length - 1}rem) / ${length})`
    }

    const getRankItemImageDimensions = (length: number) => {
        return `calc((60vw - ${length - 1}rem) / ${length} / 1.4)`
    }

    if (!game) return <></>

    console.log(game, gameRanks[game].ranks)

    return (
        <>
            {showPostGuessPopup && <PostGuessPopup setShowPostGuessPopup={setShowPostGuessPopup} />}
            <Navbar />
            <div className={styles.container}>
                <h2 className={styles["guess-name"]}>Guess <span style={{ color: '#354AA1' }}>#42</span></h2>
                <div className={styles["embed-container"]}>
                    <iframe style={{ border: 'none' }} width="100%" height="100%" src="https://www.youtube.com/embed/A79AoUqD8Do?si=jJGnsv-kJ-0LnhlA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                </div>
                <div className={styles["ranks-container"]}>
                    {gameRanks[game].ranks.map((rank, index) => {

                        let rankItemDimensions = getRankItemDimensions(gameRanks[game].ranks.length)
                        let rankItemHeightMultiplier = gameRanks[game].imageSizeMultiplierHeight
                        let rankItemWidthMultiplier = gameRanks[game].imageSizeMultiplierWidth
                        const isCsgo = game === 'csgo'

                        return (
                            <div
                                key={index}
                                onClick={() => setCurrentSelectedRank(index)}
                                className={styles.rank}
                                style={{
                                    width: rankItemDimensions,
                                    height: rankItemDimensions,
                                    border: currentSelectedRank === index ? '1px solid #354AA1' : 'none'
                                }}
                            >
                                <div className={styles["rank-image-container"]} style={{ height: `calc(${rankItemDimensions} * ${rankItemHeightMultiplier})`, width: `calc(${rankItemDimensions} * ${rankItemWidthMultiplier})` }}>
                                    <Image
                                        fill
                                        src={rank.image}
                                        alt='rank image'
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <motion.button
                    className={styles["submit-button"]}
                    onMouseEnter={() => setHoveringLockInt(true)}
                    onMouseLeave={() => setHoveringLockInt(false)}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowPostGuessPopup(true)}
                >
                    <motion.h2
                        className={styles["button-text"]}
                        animate={{
                            x: hoveringLockInt ? -10 : 0
                        }}
                    >Lock Guess</motion.h2>
                    <motion.div
                        animate={{
                            x: hoveringLockInt ? 10 : 0
                        }}
                        className={styles["arrow-icon-container"]}
                    >
                        <RightArrow />
                    </motion.div>
                </motion.button>
            </div>
        </>

    )

}

export default Play