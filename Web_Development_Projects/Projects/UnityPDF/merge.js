const mergedPdfs = async (p1, p2) => {
    const PDFMerger = await import('pdf-merger-js');
    const merger = new PDFMerger.default();

    await merger.add(p1);
    await merger.add(p2);
    let d = new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    return d;
};

module.exports = { mergedPdfs };