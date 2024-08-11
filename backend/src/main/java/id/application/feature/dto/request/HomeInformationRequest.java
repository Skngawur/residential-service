package id.application.feature.dto.request;

import id.application.util.annotations.PhoneNumber;
import id.application.util.enums.OwnershipStatus;
import lombok.Builder;

import java.io.Serializable;

/**
 * DTO for {@link id.application.feature.model.entity.LetterRequest}
 */
@Builder
public record HomeInformationRequest(
        String unit,
        String owner,
        String ownershipStatus,
        String homeCondition,
        @PhoneNumber
        String phoneNumber) implements Serializable {
}