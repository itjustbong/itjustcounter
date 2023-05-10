export const makeSvg = (
  hits: number,
  text: string = 'visits',
  bgColor: string = '#000'
) => {
  const formattedHits = new Intl.NumberFormat('kr-KO').format(hits);
  const width = `${text}:  ${formattedHits}`.length * 6.5;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${
      width + 10
    }" height="20" role="img" aria-label="${text} ${formattedHits}">
      <title>${text}: ${formattedHits}</title>
      <g shape-rendering="crispEdges">
      <rect x="0" width="${width + 3}" height="20" fill="${bgColor}"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        <text x="${
          width * 5
        }" y="140" transform="scale(.1)" fill="#fff" textLength="${
    width * 9
  }">${text}:  ${formattedHits}</text>
      </g>
    </svg>
    `;
  return svg;
};
