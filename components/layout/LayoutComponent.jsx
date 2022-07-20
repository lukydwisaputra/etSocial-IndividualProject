import Head from "next/head";
import styles from "../../styles/Home.module.css";
import HeaderComponent from "../../components/navbar/HeaderComponent";
import MobileNavbarComponent from "../../components/navbar/MobileNavbarComponent";
import LeftSidebarComponent from "../../components/sidebar/LeftSidebarComponent";
import RightSidebarComponent from "../../components/sidebar/RightSidebarComponent";
import MenubarComponent from "../menubar/MenubarComponent";
import { useMantineTheme } from "@mantine/core";

export default function LayoutComponent({children}) {
	const theme = useMantineTheme();
	const border = "1px solid rgb(166,167,171, 0.2)";
	const paddingPostDesktop = '5vh';

	return (
		<div className={styles.container}>
			<Head>
				<title>étSocial</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>

			<HeaderComponent />
			<MobileNavbarComponent />

			{/* Mobile */}
			<main style={{ marginTop: "6.5vh", marginBottom: "7vh" }} className="d-lg-none">
                {children} {/* content for mobile and tablet */}
			</main>
			
			{/* Desktop */}
			<main>
				<div className="container d-none d-sm-none d-md-none d-lg-block">
					<div className="row">
						<div className="col-1"></div>
						<div className="col-1" style={{ borderRight: border }}>
							<LeftSidebarComponent />
						</div>
						<div className="col-5" style={{minHeight: '100vh', paddingTop: paddingPostDesktop, paddingRight: '5vh', paddingLeft: '5vh'}}>
                            {children} {/* content for desktop */}
						</div>
						<div className="col-4" style={{ borderLeft: border }}>
							<RightSidebarComponent />
						</div>
						<div className="col-1"></div>
					</div>
				</div>
			</main>

			<footer></footer>
		</div>
	);
}
