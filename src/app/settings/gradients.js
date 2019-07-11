export const green2blue = 'linear-gradient(149.62deg, #51DBA9 14.66%, #52BBB5 32.2%, #5451DB 86.31%);';
export const orange2pink = 'linear-gradient(149.62deg, #DB8351 14.66%, #B751DB 86.31%);';
export const green2yellow = 'linear-gradient(149.62deg, #89E868 14.66%, #D9AA63 86.31%);';

const gradients = [green2blue, orange2pink, green2yellow];
export const getGradient = () => gradients[Math.floor(Math.random() * gradients.length)];
