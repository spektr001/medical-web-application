const getCoefficient = (value, maxV, minV) => {
  if (value > maxV) {
    value = maxV;
  } else if (value < minV) {
    value = minV;
  }

  return value / maxV;
};

export const anemiaDataset = [
  {
    input: {
      gender: 1,
      hgb: getCoefficient(15, 20, 5),
      mch: getCoefficient(23, 30, 15),
      mchc: getCoefficient(29, 40, 20),
      mcv: getCoefficient(84, 110, 60),
    },
    output: { noanemia: 1 },
  },
  {
    input: {
      gender: 0,
      hgb: getCoefficient(16, 20, 5),
      mch: getCoefficient(25, 30, 15),
      mchc: getCoefficient(28, 40, 20),
      mcv: getCoefficient(72, 110, 60),
    },
    output: { noanemia: 1 },
  },
  {
    input: {
      gender: 0,
      hgb: getCoefficient(9, 20, 5),
      mch: getCoefficient(21, 30, 15),
      mchc: getCoefficient(30, 40, 20),
      mcv: getCoefficient(71, 110, 60),
    },
    output: { anemia: 1 },
  },
  {
    input: {
      gender: 0,
      hgb: getCoefficient(15, 20, 5),
      mch: getCoefficient(16, 30, 15),
      mchc: getCoefficient(31, 40, 20),
      mcv: getCoefficient(87, 110, 60),
    },
    output: { noanemia: 1 },
  },
  {
    input: {
      gender: 1,
      hgb: getCoefficient(15, 20, 5),
      mch: getCoefficient(22, 30, 15),
      mchc: getCoefficient(28, 40, 20),
      mcv: getCoefficient(99, 110, 60),
    },
    output: { noanemia: 1 },
  },
  {
    input: {
      gender: 1,
      hgb: getCoefficient(13, 20, 5),
      mch: getCoefficient(19, 30, 15),
      mchc: getCoefficient(29, 40, 20),
      mcv: getCoefficient(83, 110, 60),
    },
    output: { anemia: 1 },
  },
  {
    input: {
      gender: 0,
      hgb: getCoefficient(11, 20, 5),
      mch: getCoefficient(24, 30, 15),
      mchc: getCoefficient(32, 40, 20),
      mcv: getCoefficient(91, 110, 60),
    },
    output: { anemia: 1 },
  },
  {
    input: {
      gender: 0,
      hgb: getCoefficient(15, 20, 5),
      mch: getCoefficient(27, 30, 15),
      mchc: getCoefficient(32, 40, 20),
      mcv: getCoefficient(72, 110, 60),
    },
    output: { noanemia: 1 },
  },
  {
    input: {
      gender: 1,
      hgb: getCoefficient(13, 20, 5),
      mch: getCoefficient(26, 30, 15),
      mchc: getCoefficient(28, 40, 20),
      mcv: getCoefficient(77, 110, 60),
    },
    output: { anemia: 1 },
  },
  {
    input: {
      gender: 0,
      hgb: getCoefficient(11, 20, 5),
      mch: getCoefficient(28, 30, 15),
      mchc: getCoefficient(31, 40, 20),
      mcv: getCoefficient(86, 110, 60),
    },
    output: { anemia: 1 },
  },
];

export const heartDisDataset = [
  {
    input: {
      gender: 0,
      age: getCoefficient(67, 80, 30),
      bp: getCoefficient(115, 180, 90),
      csl: getCoefficient(564, 570, 100),
    },
    output: { nohd: 1 },
  },
  {
    input: {
      gender: 1,
      age: getCoefficient(70, 80, 30),
      bp: getCoefficient(130, 180, 90),
      csl: getCoefficient(322, 570, 100),
    },
    output: { hd: 1 },
  },
  {
    input: {
      gender: 1,
      age: getCoefficient(57, 80, 30),
      bp: getCoefficient(124, 180, 90),
      csl: getCoefficient(261, 570, 100),
    },
    output: { hd: 1 },
  },
  {
    input: {
      gender: 1,
      age: getCoefficient(53, 80, 30),
      bp: getCoefficient(130, 180, 90),
      csl: getCoefficient(246, 570, 100),
    },
    output: { nohd: 1 },
  },
  {
    input: {
      gender: 0,
      age: getCoefficient(42, 80, 30),
      bp: getCoefficient(102, 180, 90),
      csl: getCoefficient(265, 570, 100),
    },
    output: { nohd: 1 },
  },
  {
    input: {
      gender: 0,
      age: getCoefficient(56, 80, 30),
      bp: getCoefficient(134, 180, 90),
      csl: getCoefficient(409, 570, 100),
    },
    output: { hd: 1 },
  },
  {
    input: {
      gender: 0,
      age: getCoefficient(37, 80, 30),
      bp: getCoefficient(120, 180, 90),
      csl: getCoefficient(215, 570, 100),
    },
    output: { nohd: 1 },
  },
  {
    input: {
      gender: 1,
      age: getCoefficient(34, 80, 30),
      bp: getCoefficient(118, 180, 90),
      csl: getCoefficient(182, 570, 100),
    },
    output: { nohd: 1 },
  },
  {
    input: {
      gender: 0,
      age: getCoefficient(56, 80, 30),
      bp: getCoefficient(134, 180, 90),
      csl: getCoefficient(409, 570, 100),
    },
    output: { hd: 1 },
  },
];
