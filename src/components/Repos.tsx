import { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Bar3D, Column3D, Doughnut2D, Pie3D } from "./Charts";

type Label = {
  label: string;
  value: number;
  stars: number;
};

type StarFork = {
  [key: number]: { label: string; value: number };
};

const Repos = () => {
  const { repos } = useContext(GithubContext);
  const languages = repos.reduce((total: { [key: string]: Label }, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language]?.stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // most used language
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // most start per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // most fork per language
  let { stars, forks } = repos.reduce(
    (total: { stars: StarFork; forks: StarFork }, item) => {
      const { stargazers_count, name, forks: forked } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forked] = { label: name, value: forked };
      return total;
    },
    {
      stars: {} as StarFork,
      forks: {} as StarFork,
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
