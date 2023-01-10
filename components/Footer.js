import { Flex } from '@mantine/core';
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Footer = ({classes}) => {
    const date = new Date();
    return (
      <Flex   
      justify="space-between"
      direction="row"
      wrap="wrap"
      className={classes.marginElements}
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
            href="https://www.upwork.com/freelancers/~012c65944a4dfd29e6"
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            >
            <SiUpwork />
            </a>
        </li>

        <li className={classes.icons}>
            <a
            href="https://twitter.com/krochet94"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
            >
            <AiOutlineTwitter />
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
        </ul>
        <h5>Copyright © {date.getFullYear()} krochet</h5>
      </Flex>
    );
  };

export default Footer;