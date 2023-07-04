import { Flex } from '@mantine/core';
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = ({classes}) => {
    const date = new Date();
    const handleClick = () => {
      navigator.clipboard.writeText('carljasoncainaragoncillo@gmail.com');
      window.alert('Email copied to clipboard');
    };
    return (
      <Flex   
        justify="space-between"
        direction="row"
        wrap="wrap"
        className={classes.marginElements}
        style={{ marginTop: 50, padding: 20 }}
      >
        <h5>Created by: <strong>Carl Aragoncillo</strong></h5>
        <ul className={classes.socialIcons}>
        <li className={classes.icons}>
            <a
            href="https://www.linkedin.com/in/krochet94"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaLinkedinIn />
            </a>
        </li>

        <li className={classes.icons}>
            <a
            href="https://github.com/krochet94"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
            >
            <AiFillGithub />
            </a>
        </li>

        <li className={classes.icons} onClick={handleClick}>
            <SiGmail />
        </li>

        </ul>
        <h5>Copyright © {date.getFullYear()} krochet</h5>
      </Flex>
    );
  };

export default Footer;