import { MenuToggle } from "../MenuToggle"
import { useMobile } from "src/hooks/useMobile"
import { Menu } from "../Menu"
import { Overlay } from "@/ui/Overlay"
import { useContext } from "react"
import { ConfigContext } from "src/context/ConfigContext"
import { Block } from "../Block"
import { Spacer } from "../Spacer"
import { useToggle } from "react-use"

export type NavigationProps = {
    style?: React.CSSProperties
}

export const Navigation: React.FC<NavigationProps> = props => {
    const collapseMenu = useMobile()
    const [open, toggleOpen] = useToggle(false)
    const { menu } = useContext(ConfigContext)

    if (!collapseMenu) {
        return (
            <Menu
                layout={"desktop"}
                items={menu}
            />
        )
    }

    return (
        <>
            <Overlay
                show={open}
                onClickOverlay={toggleOpen}
                duration={250}
            >
                <Block direction={"horizontal"}>
                    <Spacer />
                    <MenuToggle
                        open={open}
                        onClick={toggleOpen}
                        style={{
                            margin: "var(--size-xs)",
                        }}
                    />
                </Block>
                <Block direction={"horizontal"} style={{
                    justifyContent: "center",
                }}>
                    <nav style={{
                        width: "75%",
                    }}>
                        <Menu
                            layout={"mobile"}
                            items={menu}
                        />
                    </nav>
                </Block>
            </Overlay>

            <Block direction={"horizontal"}>
                <Spacer />
                <MenuToggle
                    open={open}
                    onClick={toggleOpen}
                    style={{
                        margin: "var(--size-xs)",
                    }}
                />
            </Block>
        </>
    )
}
