import Head from "next/head";
import styles from "../../styles/Home.module.css";
import HeaderComponent from "../../components/navbar/HeaderComponent";
import MobileNavbarComponent from "../../components/navbar/MobileNavbarComponent";
import LeftSidebarComponent from "../../components/sidebar/LeftSidebarComponent";
import RightSidebarComponent from "../../components/sidebar/RightSidebarComponent";
import MenubarComponent from "../menubar/MenubarComponent";
import { useMantineTheme } from "@mantine/core";
import { useRouter } from 'next/router';

export default function LayoutComponent({children}) {
	const border = "1px solid rgb(166,167,171, 0.2)";
	const { pathname } = useRouter();
	const isRegistrationPage = pathname.includes('/authentication') || pathname.includes('/recovery');

	return (
		<div className={styles.container}>
			<HeaderComponent />
			<MobileNavbarComponent />

			{/* Mobile */}
			<main style={{ marginTop: "7.5vh", marginBottom: "7.5vh" }} className="d-lg-none">
                {children} {/* content for mobile and tablet */}
			</main>
			
			{/* Desktop */}
			<main>
				<div className="container d-none d-sm-none d-md-none d-lg-block">
					<div className="row">
						<div className="col-1" style={{ borderRight: border }}>
							<LeftSidebarComponent />
						</div>
						{
							isRegistrationPage && 
							<>
								<div className="col-6" style={{minHeight: '100vh', paddingTop: '7vh', paddingRight: '5vh', paddingLeft: '5vh'}}>
									{children} {/* content for desktop */}
								</div>
								<div className="col-4" style={{ borderLeft: border }}>
									<RightSidebarComponent />
								</div>
								<div className="col-1"></div>
							</>
						}
						{
							!isRegistrationPage && 
							<>
								<div className="col-6" style={{minHeight: '100vh', paddingTop: '7vh', paddingRight: '5vh', paddingLeft: '5vh'}}>
									{children} {/* content for desktop */}
								</div>
								<div className="col-5" style={{ borderLeft: border }}>
									<RightSidebarComponent />
								</div>
							</>
						}

					</div>
				</div>
			</main>
		</div>
	);
}
