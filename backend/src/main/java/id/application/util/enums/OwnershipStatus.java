package id.application.util.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OwnershipStatus {
    RENT("SEWA"),
    PROPERTY_RIGHTS("HAK MILIK");

    private final String status;

    public static OwnershipStatus valueStatus(String status) {
        for (var type : OwnershipStatus.values()) {
            if (type.status.equals(status)) {
                return type;
            }
        }
        return null;
    }
}
