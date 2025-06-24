

const ProjectImage = (canvasRef) => {

    const imgData = canvasRef.current.toDataURL('image/jpeg',0.5);

    return imgData;
}

export default ProjectImage;