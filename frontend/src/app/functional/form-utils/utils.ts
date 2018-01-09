
export function getAge(dateOfBirth: Date) {
    const lifeInMilis = new Date().getTime() - new Date(dateOfBirth).getTime();
    return new Date(lifeInMilis).getFullYear() - 1970
}
