
export function energy_saving(temp_out) {
    var saving_percent
    saving_percent = Math.round(100.*(1-(18-temp_out)/(19 - temp_out)))
    return saving_percent
}