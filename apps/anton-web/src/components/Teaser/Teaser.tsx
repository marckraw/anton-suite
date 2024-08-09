"use client";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import { BrandHighlight } from "@/components/BrandHighlight";
import { deepMerge, tv } from "@/tva/helpers.tva";
import { teaserStyles } from "@/components/Teaser/teaser.styles";
import { cn } from "@/lib/utils";
import {
  DeepPartial,
  ExtractSpecificStyles,
  WithThemeConfig,
} from "@/tva/helpers.tva.types";

export type TeaserStyles = ExtractSpecificStyles<
  typeof teaserStyles,
  ["root", "texts", "paragraph"]
>;
export interface TeaserProps
  extends WithThemeConfig<DeepPartial<TeaserStyles>> {}

export const Teaser: FC<TeaserProps> = (props) => {
  const { themeConfig } = props;

  const mergedStyles = themeConfig
    ? deepMerge(teaserStyles, themeConfig)
    : teaserStyles;

  const styles = tv(mergedStyles);
  const { root, texts, paragraph } = styles();
  return (
    <div className={cn(root())}>
      <Image
        src="/assets/logo-1.png"
        width={128}
        height={128}
        alt="pre logo picture"
      />
      <div className={cn(texts())}>
        <p className={cn(paragraph())}>
          Welcome to <BrandHighlight bold={true}>Peak Pursuit</BrandHighlight> -
          your ultimate mountain hiking companion! Whether you're a novice hiker
          or a seasoned mountaineer, our app is designed to transform your
          journeys into thrilling adventures. With{" "}
          <BrandHighlight>Peak Pursuit</BrandHighlight>, you can track your
          hikes, mark your progress, and see detailed stats about your trips.
        </p>

        <p className={cn(paragraph())}>
          Challenge yourself with our unique badge system. Each summit reached
          is a victory celebrated with a bespoke badge - a digital testament to
          your triumphs! Collect them all and showcase your mountaineering
          achievements to the world.
        </p>

        <p className={cn(paragraph())}>
          The future of hiking is social with{" "}
          <BrandHighlight>Peak Pursuit</BrandHighlight>. Engage in friendly
          competition with our score-based leaderboards, plan exciting treks
          with friends, compare stats, and conquer trails together for shared
          points. Coming soon, our community features will make every hike an
          opportunity to connect, compete, and collaborate with fellow
          enthusiasts.
        </p>

        <p className={cn(paragraph())}>
          <BrandHighlight>Peak Pursuit</BrandHighlight> isn't just an app - it's
          a gateway to unforgettable experiences, shared victories, and a global
          community united by the love of hiking. Embrace the challenge, reach
          the summit, and discover what lies beyond with{" "}
          <BrandHighlight>Peak Pursuit</BrandHighlight>.
        </p>
      </div>
    </div>
  );
};
