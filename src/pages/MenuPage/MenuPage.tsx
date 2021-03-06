import React, { useState } from "react";
import "./MenuPage.css";
import { Button, NumberInput } from "../../components";
import { useSelector } from "react-redux";
import { RootStateType } from "../../redux/reducer";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";

export interface MenuPageProps {
  history: any;
}

const MenuPage: React.FunctionComponent<MenuPageProps> = (props) => {
  const cards = useSelector((state: RootStateType) => state.game.cards);
  const [cardValue, setCardValue] = useState(1);
  const [selectCard, setSelectCard] = useState(false);

  return (
    <main className='menu'>
      <img
        className='logo'
        src='/img/logo.svg'
        alt='Logo von Obst Strand Musiker'
      />
      <Button
        value={"zufällige\nbegriffe"}
        onClick={() => {
          props.history.push(
            "/card/" + Math.random().toString().replace(".", "")
          );
        }}
      />
      <Button
        value={"zufällige\nkarte"}
        onClick={() => {
          props.history.push("/card/" + getRandomInt(0, cards.length - 1));
        }}
      />

      <motion.div
        className='inputgroup'
        key='content'
        initial='collapsed'
        animate={selectCard ? "open" : "collapsed"}
        exit='collapsed'
        variants={{
          open: { opacity: 1, height: "100px" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <NumberInput
          min={1}
          max={12}
          step={1}
          value={cardValue}
          onChange={(value) => {
            console.log(value);
            setCardValue(value);
          }}
          onEnter={() => {
            props.history.push("/card/" + cardValue.toString());
          }}
        />
        <Button
          value='auswählen'
          edge='top'
          className='button--cardselect'
          onClick={() => {
            props.history.push("/card/" + cardValue.toString());
          }}
        />
      </motion.div>
      <motion.div
        className='nooverflow'
        key='content'
        initial='collapsed'
        animate={selectCard ? "collapsed" : "open"}
        exit='collapsed'
        variants={{
          open: { opacity: 1, height: "100px" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <Button
          value={"karte\nwählen"}
          onClick={() => {
            setSelectCard(!selectCard);
          }}
        />
      </motion.div>

      <Button
        value={"anleitung"}
        onClick={() => {
          props.history.push("/instructions/");
        }}
      />

      <Button
        value='credits'
        edge='bottom'
        className='button--credits'
        onClick={() => {
          props.history.push("/credits");
        }}
      />
    </main>
  );
};

export default withRouter(MenuPage);

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
